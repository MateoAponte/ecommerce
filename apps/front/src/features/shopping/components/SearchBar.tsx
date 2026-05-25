import { TextField, IconButton, InputAdornment } from '@mui/material';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (keywoard: string) => Promise<void> | void;
  placeholder?: string;
};

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search products...',
}: SearchBarProps) => {
  return (
    <div className="w-100">
      <TextField
        fullWidth
        size="small"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch?.(value);
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onChange('')}>
                  <i className="fa-solid fa-xmark"></i>
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '999px',
            backgroundColor: '#fff',
          },
        }}
      />
    </div>
  );
};
