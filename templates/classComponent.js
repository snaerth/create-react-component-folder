module.exports = `{{{ imports }}}
{{#if proptypes}}
  {{#unless typescript ~}}
    import PropTypes from 'prop-types';
  {{/unless}}
{{/if}} 
{{#if typescript }}
{{#if proptypes}}

{{#if export}}export {{/if}}type {{ name }}Props = {
  //
}
{{/if}}
{{/if}}

{{#if export }}export {{/if}}class {{ name }} extends Component{{~#if typescript}}<
          {{~#if proptypes}}
            {{~ name }}Props
          {{~else~}}
            any
          {{~/if~}}, any>
        {{~/if}} {
  render() {
    return (
      {{#if reactnative }}
      <View>
        <Text>{{ name }}</Text>
      </View>
      {{else}}
      <div>
        {{ name }}
      </div>
      {{/if}}
    );
  }
}
{{#if propTypes}}
  {{#unless typescript }}

    {{~ name }}.propTypes = {
    }
    {{#unless export}}

    {{/unless}}
  {{/unless}}
{{/if}}
{{#unless export }}

export default {{ name }};
{{/unless}}
`;
