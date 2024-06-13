import { Grid } from "@mui/material";
import FinanceTable from "./FinanceTable";

const Finance = () => {
  return (
    <div className="px-10 py-10">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <FinanceTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Finance;
