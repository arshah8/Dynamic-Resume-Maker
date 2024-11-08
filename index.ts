// used object oriented programming concepts
interface ToggleableElement {
    checkbox: HTMLInputElement;
    input: HTMLInputElement | HTMLTextAreaElement;
} 

class ResumeFormToggler {
    private form: HTMLFormElement;
    private toggleableElements: ToggleableElement[];

    constructor() {
        this.form = document.getElementById('resumeForm') as HTMLFormElement;
        this.toggleableElements = this.initializeToggleableElements();
        this.setupEventListeners();
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
        input.style.opacity = '1';
        input.style.height = 'auto';
        input.style.margin = '10px 0';
        input.setAttribute('required', 'required');
        
       
        input.offsetHeight;
    }

    private hideInput(input: HTMLInputElement | HTMLTextAreaElement): void {
        input.style.opacity = '0';
        input.style.height = '0';
        input.style.margin = '0';
        input.removeAttribute('required');
        
        
        setTimeout(() => {
            input.style.display = 'none';
        }, 300);
    }

   
    public initFormSubmission(): void {
        this.form.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.handleFormSubmission();
        });
    }

    private handleFormSubmission(): void {
        const formData = new FormData(this.form);
        const formValues: { [key: string]: string } = {};

        formData.forEach((value, key) => {
            formValues[key] = value.toString();
        });

        console.log('Form Submitted:', formValues);
      
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const resumeFormToggler = new ResumeFormToggler();
    resumeFormToggler.initFormSubmission();
});