{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

{{#if hasCategories}}
	<div class="facets-faceted-navigation-facet-group">
	<div class="facets-faceted-navigation-title">
		{{translate 'Shop: $(0)' categoryItemId}}
	</div>
	<div class="facets-faceted-navigation-category-wrapper">
		<div data-type="facet" data-facet-id="category"></div>
	</div>
</div>
{{/if}}

{{#if hasFacetsOrAppliedFacets}}

    <div class="facets-faceted-navigation">
        {{#if hasAppliedFacets}}
            <a href="{{clearAllFacetsLink}}" class="facets-faceted-navigation-facets-clear">
                {{translate 'Clear All'}}
                <i class="facets-faceted-navigation-facets-clear-icon"></i>
            </a>
        {{/if}}

        <div data-action="tab-content">
            <div data-view="Facets.FacetedNavigationItems.Header" class="facets_faceted_navigation_container_header"></div>
            <div data-view="Facets.FacetedNavigationItems" class="facets_faceted_navigation_container"></div>
            <div class="facets-faceted-navigation-facets-clear-mobile-container">
                <a href="{{clearAllFacetsLink}}" class="facets-faceted-navigation-facets-clear-mobile">
                    {{translate 'Reset Filters'}}
                </a>
            </div>
        </div>
    </div>
{{/if}}
