<div class="measurements-container">
    <div class="measurements-select-instructions-container">
        <div class="measurements-select-instruction">
            Please select the way you would like us to get your measurements so that we can ensure a perfect fit.
        </div>
    </div>
    <div class="measurements-select-body-container">
        <div class="measurements-select-container">
            {{#each options}}
                <div class="measurements-select">
                    <input type="radio" class="measurements-select-radio" id="measurements-{{internalid}}" name="measurements" value="{{internalid}}" {{#if checked}} checked {{/if}} />
                    <div class="measurements-select-info">
                        <label for="measurements-{{internalid}}">{{description}}</label>
                    </div>
                    
                </div>
            {{/each}}
        </div>
        <div class="measurements-help-container">
            <div class="measurements-help">
                {{{help}}}
            </div>
        </div>
    </div>
</div>

