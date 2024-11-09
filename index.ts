interface ToggleableElement {
    checkbox: HTMLInputElement;
    input: HTMLInputElement | HTMLTextAreaElement;
} 

class ResumeFormToggler {
    private form: HTMLFormElement;
    private toggleableElements: ToggleableElement[];

    constructor() {
        const formElement = document.getElementById('resumeForm');
        if (!formElement) {
            throw new Error('Resume form not found');
        }
        
        this.form = formElement as HTMLFormElement;
        this.toggleableElements = this.initializeToggleableElements();
        this.setupEventListeners();
        this.initFormSubmission();
    }

    private initializeToggleableElements(): ToggleableElement[] {
        const toggleCheckboxes = document.querySelectorAll('.toggle-checkbox');
        
        return Array.from(toggleCheckboxes).map(checkbox => {
            const checkboxInput = checkbox as HTMLInputElement;
            const label = checkboxInput.closest('label');
            
            if (!label) {
                throw new Error('Checkbox must be inside a label');
            }
            
            const input = label.nextElementSibling as HTMLInputElement | HTMLTextAreaElement;
            
            if (!input) {
                throw new Error('No input element found after checkbox label');
            }
         
            this.updateInputVisibility(checkboxInput, input);
            
            return {
                checkbox: checkboxInput,
                input: input
            };
        });
    }

    private setupEventListeners(): void {
        this.toggleableElements.forEach(({ checkbox, input }) => {
            checkbox.addEventListener('change', () => {
                this.updateInputVisibility(checkbox, input);
            });
        });
    }

    private updateInputVisibility(
        checkbox: HTMLInputElement, 
        input: HTMLInputElement | HTMLTextAreaElement
    ): void {
        if (checkbox.checked) {
            this.showInput(input);
        } else {
            this.hideInput(input);
        }
    }

    private showInput(input: HTMLInputElement | HTMLTextAreaElement): void {
        input.style.display = 'block';
        input.style.transition = 'all 0.3s ease-in-out';
        
      
        requestAnimationFrame(() => {
            input.style.opacity = '1';
            input.style.height = 'auto';
            input.style.margin = '10px 0';
            input.setAttribute('required', 'required');
        });
    }

    private hideInput(input: HTMLInputElement | HTMLTextAreaElement): void {
        input.style.transition = 'all 0.3s ease-in-out';
        input.style.opacity = '0';
        input.style.height = '0';
        input.style.margin = '0';
        input.removeAttribute('required');
        
        
        setTimeout(() => {
            input.style.display = 'none';
        }, 300);
    }

    public initFormSubmission(): void {
        this.form.addEventListener('submit', this.handleFormSubmission.bind(this));
    }

    private handleFormSubmission(event: Event): void {
        event.preventDefault();
        
        
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const formValues: { [key: string]: string } = {};

        formData.forEach((value, key) => {
            formValues[key] = value.toString().trim();
        });

        try {
            
            console.log('Form Submitted:', formValues);
            this.submitForm(formValues);
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleSubmissionError(error);
        }
    }

    private validateForm(): boolean {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const inputField = field as HTMLInputElement | HTMLTextAreaElement;
            if (!inputField.value.trim()) {
                inputField.classList.add('error');
                isValid = false;
            } else {
                inputField.classList.remove('error');
            }
        });

        return isValid;
    }

    private submitForm(formData: { [key: string]: string }): void {
       
        console.log('Submitting form data:', formData);
    }

    private handleSubmissionError(error: unknown): void {

        const errorMessage = error instanceof Error ? error.message : String(error);
        alert(`Submission failed: ${errorMessage}`);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    try {
        const resumeFormToggler = new ResumeFormToggler();
    } catch (error) {
        console.error('Failed to initialize Resume Form Toggler:', error);
    }
});