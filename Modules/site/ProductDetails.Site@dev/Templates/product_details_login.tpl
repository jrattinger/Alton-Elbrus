<div class="product-details-login-container">
    <form class="product-details-login-form" novalidate>
        <fieldset class="product-details-login-form-fieldset">
            <input type="text" autofocus="autofocus" style="display:none" />
            <div class="product-details-login-form-controls-group" data-validation="control-group">
                <div class="product-details-login-form-controls" data-validation="control">
                    <input type="email" name="email" id="login-email" class="product-details-login-form-input" placeholder="{{translate 'Email'}}"/>
                </div>
            </div>
 
            <div class="product-details-login-form-controls-group" data-validation="control-group">
                <div class="product-details-login-form-controls" data-validation="control">
                    <input type="password" name="password" id="login-password" class="product-details-login-form-input" placeholder="{{translate 'Password'}}">
                </div>
            </div>
            <div class="product-details-login-form-buttons-group" data-type="form-login-action">
                <button type="submit" class="product-details-login-submit" data-action="login-button">
                    {{translate 'Log In'}}
                </button>
                <a class="product-details-login-guest" data-action="continue-as-guest">
                    {{translate 'Continue as guest'}}
                </a>
            </div>
        </fieldset>
    </form>
</div>