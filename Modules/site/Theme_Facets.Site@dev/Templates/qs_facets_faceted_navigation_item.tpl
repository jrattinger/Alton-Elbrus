{{#if showFacet}}
    {{#if showHeading}}
        <div class="facets-faceted-navigation-item-facet-group-title-container collapsed" aria-expanded="false" data-toggle="collapse" data-target="#facetList_{{facetId}}-t">
            <h4 class="facets-faceted-navigation-item-facet-group-title">{{facetDisplayName}}</h4>
        </div>
    {{/if}}
    {{#if showOptions}}
        <div class="facets-faceted-navigation-item-facet-group collapse" id="facetList_{{facetId}}-t" role="tabpanel" data-type="rendered-facet" data-facet-id="{{facetId}}">
            <div class="facets-faceted-navigation-item-facet-group-wrapper">
                <div class="facets-faceted-navigation-item-facet-group-content">
                    <ul class="facets-faceted-navigation-item-facet-optionlist {{#if isCentered}} centered {{/if}}">
                        {{#each displayValues}}
                            <li>
                                <a class="facets-faceted-navigation-item-facet-option {{#if isActive}}option-active{{/if}}" href="{{link}}" title="{{label}}">
                                    <input type="checkbox" class="facets-faceted-navigation-item-facet-multi" {{#if isActive}}checked {{/if}} />
                                    <div class="facets-faceted-navigation-item-facet-text">{{displayName}}</div>
                                </a>
                            </li>
                        {{/each}}
                    </ul>
                </div>
            </div>
        </div>
    {{/if}}
{{/if}}