{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="product-details-information-content">
	{{#if showInformation}}
		<div class="product-details-information-content-container">
			<div role="tabpanel">
				{{!-- Tab Contents --}}
				<div class="product-details-information-tab-content" data-type="information-content" data-action="tab-content">
					{{#each details}}
						<div role="tabpanel" class="product-details-information-tab-content-panel {{#if @first}}active{{/if}}" id="product-details-information-tab-{{@index}}" itemprop="{{itemprop}}">
							<div id="product-details-information-tab-content-container-{{@index}}" class="product-details-information-tab-content-container" data-type="information-content-text">{{{content}}}</div>
						</div>
					{{/each}}
				</div>
			</div>
		</div>
	{{/if}}
</div>



{{!----
Use the following context variables when customizing this template: 
	
	showInformation (Boolean)
	showHeader (Boolean)
	details (Array)

----}}
