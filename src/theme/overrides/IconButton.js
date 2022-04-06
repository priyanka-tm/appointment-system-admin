// ----------------------------------------------------------------------

export default function IconButton(theme) {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { color: '#2F80ED' },
          style: {
            '&:hover': { backgroundColor: theme.palette.action.hover }
          }
        },
        {
          props: { color: '#2F80ED' },
          style: {
            '&:hover': { backgroundColor: theme.palette.action.hover }
          }
        }
      ],

      styleOverrides: {
        root: {}
      }
    }
  };
}
