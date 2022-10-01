import type { Form } from '../types/form.type'

export const profileUpdateJson: Form[] = [
  {
    name: 'bio',
    placeholder: 'Add a short bio...',
    label: 'Bio',
    type: 'textarea',
    value: '',
    class: 'lg:col-span-2',
  },
  {
    name: 'location',
    placeholder: 'Add a location...',
    label: 'Location',
    type: 'text',
    value: '',
  },
  {
    name: 'dateOfBirth',
    placeholder: 'When you were born',
    label: 'When you were born',
    type: 'date',
    value: '',
  },
  {
    name: 'profession',
    placeholder: 'What do you do?',
    label: 'Profession',
    type: 'text',
    value: '',
  },
  {
    name: 'website',
    placeholder: 'Add your website link',
    label: 'Website',
    type: 'text',
    value: '',
    validation(value: string) {
      if (!value) return ''
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:' ? '' : 'Invalid URL'
    },
  },
]
