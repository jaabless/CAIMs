import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import type { AppUser } from '../types';

const ROLES: AppUser['role'][] = ['Super Admin', 'Admin', 'Supervisor', 'Field Officer'];

interface FormState {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  sex: string;
  phone: string;
  role: string;
  status: string;
}

const EMPTY: FormState = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  sex: '',
  phone: '',
  role: '',
  status: '',
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/10 transition';

export default function CreateUser() {
  const navigate = useNavigate();
  const location = useLocation();

  // If navigated here from Edit, location.state will contain the user
  const editUser = (location.state as { user?: AppUser } | null)?.user ?? null;
  const isEdit = editUser !== null;

  const [form, setForm] = useState<FormState>(
    editUser
      ? {
          firstName: editUser.firstName,
          middleName: editUser.middleName,
          lastName: editUser.lastName,
          email: editUser.email,
          sex: editUser.sex,
          phone: editUser.phone,
          role: editUser.role,
          status: editUser.status,
        }
      : EMPTY
  );

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!isEdit) {
      try {
        const res = await fetch('/api/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            role: form.role,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? 'Failed to create user. Please try again.');
          setIsLoading(false);
          return;
        }
      } catch {
        setError('Network error. Please check your connection and try again.');
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
    setSubmitted(true);
    setTimeout(() => navigate('/user-management'), 1500);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-xl">✓</span>
        </div>
        <p className="text-gray-700 font-medium">
          User {isEdit ? 'updated' : 'created successfully — a welcome email has been sent'}!
        </p>
        <p className="text-sm text-gray-400">Redirecting to User Management…</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/user-management')}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Edit User' : 'Create User'}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {isEdit ? "Update the user's details below" : 'Add a new user to the system'}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="First Name" required>
              <input
                className={inputCls}
                placeholder="e.g. Kwame"
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                required
              />
            </Field>
            <Field label="Middle Name">
              <input
                className={inputCls}
                placeholder="e.g. Atta"
                value={form.middleName}
                onChange={(e) => set('middleName', e.target.value)}
              />
            </Field>
            <Field label="Last Name" required>
              <input
                className={inputCls}
                placeholder="e.g. Boateng"
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                required
              />
            </Field>
          </div>

          {/* Email */}
          <Field label="Email Address" required>
            <input
              type="email"
              className={inputCls}
              placeholder="user@caims.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
            />
          </Field>

          {/* Sex + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Sex" required>
              <select
                className={inputCls}
                value={form.sex}
                onChange={(e) => set('sex', e.target.value)}
                required
              >
                <option value="" disabled>Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>
            <Field label="Phone Number" required>
              <input
                type="tel"
                className={inputCls}
                placeholder="e.g. 0244000000"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                required
              />
            </Field>
          </div>

          {/* Role + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Role" required>
              <select
                className={inputCls}
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                required
              >
                <option value="" disabled>Select role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Status" required>
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                required
              >
                <option value="" disabled>Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-3.5 py-2.5 rounded-lg">
              <span className="shrink-0">⚠</span>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/user-management')}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a6b4a] hover:bg-[#155c3e] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold transition"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {isEdit ? 'Updating…' : 'Creating…'}
                </>
              ) : (
                isEdit ? 'Update User' : 'Create User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
