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
					<ul class="facets-faceted-navigation-item-facet-optionlist colorlist{{#if isCentered}} centered {{/if}}">
						{{#each displayValues}}
							<li class="facets-faceted-navigation-item-facet-optionlist-option">
								<a href="{{link}}" title="{{label}}" data-color="{{label}}" class="facets-faceted-navigation-item-facet-option color {{#if isLightColor}}white-border{{/if}} {{#if isActive}}option-active{{/if}}">
									{{#if isImageTile}}
										<img
											src="{{image.src}}"
											alt="{{label}}"
											width="{{image.width}}"
											height="{{image.height}}">
									{{else}}
										<div class="facets-faceted-navigation-item-color-picker-color" style="background: {{color}}"></div> 
										<div class="facets-faceted-navigation-item-color-text">{{displayName}}</div>
									{{/if}}
								</a>
							</li>
						{{/each}}
					</ul>
				</div>
			</div>
        </div>
    {{/if}}
{{/if}}