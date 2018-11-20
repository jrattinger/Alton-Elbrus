{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="address-edit-fields">
	<div data-type="alert-placeholder"></div>
	<div class="address-edit-fields-row">
		<div class="address-edit-fields-group" data-input="fullname" data-validation="control-group">
			<label class="address-edit-fields-group-label" for="{{manage}}fullname">
				{{translate 'Full Name'}}
			</label>
			<div  class="address-edit-fields-group-form-controls" data-validation="control">
				<input type="text" class="address-edit-fields-group-input required" id="{{manage}}fullname" name="fullname" value="{{fullName}}">
			</div>
		</div>
		<div class="address-edit-fields-group" data-input="city" data-validation="control-group">
			<label class="address-edit-fields-group-label" for="{{manage}}city">
				{{translate 'City'}} 
			</label>
			<div  class="address-edit-fields-group-form-controls" data-validation="control">
				<input type="text" class="address-edit-fields-group-input required" id="{{manage}}city" name="city" value="{{city}}">
			</div>
		</div>
	</div>
	<div class="address-edit-fields-row">
		<div class="address-edit-fields-group" data-input="addr1" data-validation="control-group">
			<label class="address-edit-fields-group-label" for="{{manage}}addr1">
				{{translate 'Address 1'}}
			</label>
			<div  class="address-edit-fields-group-form-controls" data-validation="control">
				<input type="text" class="address-edit-fields-group-input required" id="{{manage}}addr1" name="addr1" value="{{addressLine1}}">
			</div>
		</div>
		<div class="address-edit-fields-group" data-input="state" data-view="StatesView" data-validation="control-group"></div>
	</div>
	<div class="address-edit-fields-row">
		<div class="address-edit-fields-group address-edit-fields-group-big" data-input="addr2">
			<label for="{{manage}}addr2" class="address-edit-fields-group-label">
				{{translate 'Address 2'}}
			</label>
			<div>
				<input type="text" class="address-edit-fields-group-input" id="{{manage}}addr2" name="addr2" value="{{addressLine2}}">
			</div>
		</div>
		<div class="address-edit-fields-group {{#unless showCountriesField}} hide {{/unless}}" data-view="CountriesDropdown" data-input="country" data-validation="control-group"></div>
	</div>
	<div class="address-edit-fields-row">
		<div class="address-edit-fields-group" data-input="zip" {{#if isZipOptional}} style="display: none;" {{/if}} data-validation="control-group">
			<label class="address-edit-fields-group-label" for="{{manage}}zip">
				{{translate 'Zip Code'}}
			</label>
			<div  class="address-edit-fields-group-form-controls" data-validation="control">
				<input type="text" class="address-edit-fields-group-input required" id="{{manage}}zip" name="zip" value="{{zip}}" data-type="zip">
			</div>
		</div>
		<div class="address-edit-fields-group"  data-input="phone" data-validation="control-group">
			<label class="address-edit-fields-group-label" for="{{manage}}phone">
				{{translate 'Phone Number (xxx) xxx-xxxx'}}
			</label>
			<div  class="address-edit-fields-group-form-controls" data-validation="control">
				<input type="tel" class="address-edit-fields-group-input required" id="{{manage}}phone" name="phone" value="{{phone}}" data-action="inputphone">
			</div>
		</div>
	</div>
	<div class="address-edit-fields-row">
		<div class="address-edit-fields-group" data-input="isresidential">
			<label class="address-edit-fields-group-input-checkbox">
				<input type="checkbox" id="{{manage}}isresidential" value="T" data-unchecked-value="F" name="isresidential" {{#if isAddressResidential}} checked {{/if}} >
				{{translate 'This is a Residential Address'}}
				<i class="address-edit-fields-icon-question-sign" data-toggle="tooltip" title="" data-original-title="{{translate 'Indicating that this is a residential address will help us determine the best delivery method for your items.'}}"></i>
			</label>
		</div>
	</div>
</div>



{{!----
Use the following context variables when customizing this template: 
	
	manage (String)
	showCompanyField (Boolean)
	isCompanyFieldMandatory (Boolean)
	showCountriesField (Boolean)
	isZipOptional (Boolean)
	isAddressResidential (Boolean)
	showDefaultControls (Boolean)
	isAddressDefaultBilling (Boolean)
	isCurrentTouchPointCheckout (Boolean)
	isAddressDefaultShipping (Boolean)
	showAddressFormSecondAddress (Boolean)
	fullName (String)
	addressLine1 (String)
	city (String)
	zip (String)
	phone (String)
	company (String)
	addressLine2 (String)

----}}
