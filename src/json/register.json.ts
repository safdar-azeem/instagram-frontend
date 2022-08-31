import type { Form } from '../types/form.type'

export const registerJson: Form[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Please enter your name',
    type: 'text',
    value: '',
    variant: 'neobrutalism',
    validation(value: string) {
      if (!value) {
        return 'Name is required'
      }
      if (value.length < 3) {
        return 'Name must be at least 3 characters'
      }
      return ''
    },
  },
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
    placeholder: 'Create a password',
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
