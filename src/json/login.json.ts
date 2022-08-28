import type { Form } from '../types/form.type'

export const loginJson: Form[] = [
  {
    name: 'email',
    placeholder: 'Please enter your email',
    label: 'Email',
    type: 'email',
    value: '',
    variant: 'neobrutalism',
    validation(value: string) {
      if (!value) {
        return 'Email is required'
      }
      if (!value.includes('@')) {
        return 'Email must be valid'
      }
      return ''
    },
  },
  {
    name: 'password',
    placeholder: 'Please enter your password',
    label: 'Password',
    type: 'password',
    value: '',
    variant: 'neobrutalism',
    validation(value: string) {
      if (!value) {
        return 'Password is required'
      }
      if (value.length < 6) {
        return 'Password must be at least 6 characters'
      }
      return ''
    },
  },
]
