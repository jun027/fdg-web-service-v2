import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

// ----------------------------------------------------------------------

export default function RHFTextField({
  name,
  helperText,
  disabledError,
  type,
  ...other
}) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error && !disabledError ? error?.message : helperText}
          sx={{
            '& .MuiInputBase-root': {
              p: 0,
              borderRadius: '10px',
              backgroundColor: '#fff',
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                  borderRadius: '12px',
                  borderColor: '#5D4037',
                },
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#5D4037',
            },
            '& .MuiOutlinedInput-input': {
              p: '12px 16px',
            },
            '& .MuiInputAdornment-root': {
              marginRight: '16px',
            },
          }}
          slotProps={{
            htmlInput: {
              className: '!desktop-jf-h3',
            },
          }}
          onChange={event => {
            if (type === 'number') {
              field.onChange(Number(event.target.value))
            } else {
              field.onChange(event.target.value)
            }
          }}
          {...field}
          {...other}
        />
      )}
    />
  )
}
