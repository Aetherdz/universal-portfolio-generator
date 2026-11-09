/* =============================================
   js/form.js — Master Form Coordinator & Glue
   Universal Portfolio Generator — Next-Gen Studio
   ============================================= */

// Re-export methods on FormState for backwards compatibility
if (typeof FormState !== 'undefined') {
  FormState.renderStep = function (step) {
    this.currentStep = step;
    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }
  };

  FormState.init = function () {
    this.loadFromStorage();
    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }
  };
}

// Global hook for stepper dot & tab clicks
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.step-tab, .step-dot').forEach(tab => {
    tab.addEventListener('click', function () {
      const step = this.dataset.step;
      if (typeof goToStep === 'function') {
        goToStep(step);
      }
    });
  });

  if (typeof FormState !== 'undefined' && typeof FormState.init === 'function') {
    FormState.init();
  }
});
