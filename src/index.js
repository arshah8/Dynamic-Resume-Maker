var ResumeFormToggler = /** @class */ (function () {
    function ResumeFormToggler() {
        this.form = document.getElementById('resumeForm');
        this.toggleableElements = this.initializeToggleableElements();
        this.setupEventListeners();
    }
    ResumeFormToggler.prototype.initializeToggleableElements = function () {
        var _this = this;
        var toggleCheckboxes = document.querySelectorAll('.toggle-checkbox');
        return Array.from(toggleCheckboxes).map(function (checkbox) {
            var checkboxInput = checkbox;
            var label = checkboxInput.closest('label');
            if (!label) {
                throw new Error('Checkbox must be inside a label');
            }
            var input = label.nextElementSibling;
            _this.updateInputVisibility(checkboxInput, input);
            return {
                checkbox: checkboxInput,
                input: input
            };
        });
    };
    ResumeFormToggler.prototype.setupEventListeners = function () {
        var _this = this;
        this.toggleableElements.forEach(function (_a) {
            var checkbox = _a.checkbox, input = _a.input;
            checkbox.addEventListener('change', function () {
                _this.updateInputVisibility(checkbox, input);
            });
        });
    };
    ResumeFormToggler.prototype.updateInputVisibility = function (checkbox, input) {
        if (checkbox.checked) {
            this.showInput(input);
        }
        else {
            this.hideInput(input);
        }
    };
    ResumeFormToggler.prototype.showInput = function (input) {
        input.style.display = 'block';
        input.style.opacity = '1';
        input.style.height = 'auto';
        input.style.margin = '10px 0';
        input.setAttribute('required', 'required');
        input.offsetHeight;
    };
    ResumeFormToggler.prototype.hideInput = function (input) {
        input.style.opacity = '0';
        input.style.height = '0';
        input.style.margin = '0';
        input.removeAttribute('required');
        setTimeout(function () {
            input.style.display = 'none';
        }, 300);
    };
    ResumeFormToggler.prototype.initFormSubmission = function () {
        var _this = this;
        this.form.addEventListener('submit', function (event) {
            event.preventDefault();
            _this.handleFormSubmission();
        });
    };
    ResumeFormToggler.prototype.handleFormSubmission = function () {
        var formData = new FormData(this.form);
        var formValues = {};
        formData.forEach(function (value, key) {
            formValues[key] = value.toString();
        });
        console.log('Form Submitted:', formValues);
    };
    return ResumeFormToggler;
}());
