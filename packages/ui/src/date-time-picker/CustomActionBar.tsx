// import { Button, DialogActions } from '../base';

import { Button, DialogActions } from "@mui/material";



export const CustomActionBar = ({ onAccept, onCancel }: any) => {
  return (
    <DialogActions>
      <Button onClick={onCancel}>انصراف</Button>
      <Button onClick={onAccept} variant={"contained"}>
        تأیید
      </Button>
    </DialogActions>
  );
};
