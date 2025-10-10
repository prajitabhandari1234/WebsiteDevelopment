import { useState } from "react";

export default function BootcampModal({ open, onClose, onSubmit }) {
  const [interest, setInterest] = useState("");

  if (!open) return null;

  return (
    <div className="modal is-open" role="dialog" aria-modal="true">
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="modal-panel"
        role="document"
        aria-labelledby="bootcampModalTitle"
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          &times;
        </button>

        <h3 id="bootcampModalTitle" className="modal-title">
          Workshop Application
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
            onClose();
          }}
        >
          <div className="form-row">
            <label htmlFor="bcName">
              Full Name <span className="req">*</span>
            </label>
            <input id="bcName" type="text" name="name" required />
          </div>

          <div className="form-row">
            <label htmlFor="bcEmail">
              Email <span className="req">*</span>
            </label>
            <input id="bcEmail" type="email" name="email" required />
          </div>

          <div className="form-row">
            <label htmlFor="bcPhone">Phone</label>
            <input id="bcPhone" type="tel" name="phone" />
          </div>

          <div className="form-row">
            <label htmlFor="bcInterest">
              Area of Interest <span className="req">*</span>
            </label>
            <select
              id="bcInterest"
              name="interest"
              required
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Select one…</option>
              <option value="frontend">Website Frontend</option>
              <option value="backend">Backend</option>
              <option value="networking">Networking</option>
              <option value="ml">Machine Learning</option>
              <option value="powerbi">Power BI</option>
              <option value="other">Other</option>
            </select>
          </div>

          {interest === "other" && (
            <div className="form-row">
              <label htmlFor="bcOther">Other interest</label>
              <input
                id="bcOther"
                type="text"
                name="other_interest"
                placeholder="Tell us what you're into"
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="startup-cta primary">
              Submit Application
            </button>
          </div>

          <p className="form-note">
            We’ll reply by email within 3–5 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
