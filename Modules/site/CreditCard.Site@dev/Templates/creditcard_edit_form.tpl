{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<fieldset class="creditcard-edit-form">
	<div data-type="alert-placeholder"></div>

	<div class="creditcard-edit-form-row">
		<div class="creditcard-edit-form-group" data-input="ccname" data-validation="control-group">
			<label class="creditcard-edit-form-label" for="ccname">
				{{translate 'Name on Card'}}
			</label>
			<div class="creditcard-edit-form-controls" data-validation="control">
				<input type="text" class="creditcard-edit-form-input required" id="ccname" name="ccname" maxlength="26" value="{{ccname}}">
			</div>
		</div>
		<div class="creditcard-edit-form-group" data-input="ccnumber" data-validation="control-group">
			<label class="creditcard-edit-form-label" for="ccnumber">
				{{translate 'Card Number'}}
			</label>
			<div class="creditcard-edit-form-controls" data-validation="control">
				<input type="text" class="creditcard-edit-form-input required" id="ccnumber" name="ccnumber" value="{{ccnumber}}" {{#unless isNew}}disabled{{/unless}}>
			</div>
		</div>
	</div>

	<div class="creditcard-edit-form-row">
		<div class="creditcard-edit-form-group">
			<div class="credit-card-edit-form-inline" data-validation="control-group">
				<label class="creditcard-edit-form-label" for="expmonth">
					{{translate 'Expiration Date'}}
				</label>
				<div class="creditcard-edit-form-controls" data-validation="control">
					<div>
						<select class="creditcard-edit-form-select" id="expmonth" name="expmonth">
							{{#each months}}
								<option value="{{month}}" {{#if selected}} selected {{/if}}>
									{{month}}
								</option>
							{{/each}}
						</select>
						<select class="creditcard-edit-form-select" id="expyear" name="expyear">
							{{#each years}}
								<option value="{{year}}" {{#if selected}} selected {{/if}} {{#if disabled}} disabled {{/if}}>
									{{year}}
								</option>
							{{/each}}
						</select>
					</div>
				</div>
			</div>
			<div class="credit-card-edit-form-inline">
				{{#if showSecurityCodeForm}}
					<div data-view="CreditCard.Edit.Form.SecurityCode"></div>
				{{/if}}
			</div>
		</div>
		
		<div class="creditcard-edit-form-group">
			{{#if showPaymentSelector}}
				<div class="creditcard-edit-form-controls-cc-select-container" data-value="creditcard-select-container" data-validation="control-group">
						<label class="creditcard-edit-form-controls-cc-select-label" for="paymentmethod"> 
							{{translate 'Credit Card Type:'}}
						</label>
						<div data-validation="control">
							<select class="creditcard-edit-form-controls-cc-select" id="paymentmethod" name="paymentmethod">
								<option value="0">{{translate 'Please Select Credit Card Type'}}</option>
								{{#each paymentMethods}}
									<option value="{{key}}" {{#if selected}} selected {{/if}}>{{name}}</option>
								{{/each}}
							</select>
						</div>
				</div>
			{{else}}
				<input class="creditcard-edit-form-input" type="hidden" id="paymentmethod" name="paymentmethod" value="{{paymentMethodValue}}"/>
			{{/if}}
			<div class="creditcard-edit-form-controls-img-container" data-value="creditcard-img-container">
				{{#each paymentMethods}}
					<img
						class="creditcard-edit-form-card-icon {{#if hidden}} hidden {{/if}}"
						src="{{icon}}"
						data-value="{{key}}"
						alt="{{name}}"
						data-image="creditcard-icon"
					/>
				{{/each}}			
			</div>
		</div>
	</div>
</fieldset>




{{!----
Use the following context variables when customizing this template: 
	
	paymentMethods (Array)
	paymentMethodValue (String)
	showPaymentSelector (Boolean)
	isNew (Boolean)
	months (Array)
	years (Array)
	showDefaults (Boolean)
	ccdefault (Boolean)
	showSecurityCodeForm (Boolean)
	showSaveCreditCardCheckbox (Boolean)
	saveCreditCardByDefault (Boolean)

----}}
