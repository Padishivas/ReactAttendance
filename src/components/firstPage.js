import { Grid } from "@mui/material"
import "../styles/firstPage.css"
import LoginRegisterPage from "./loginRegisterPage";

const FirstPage = () => {
    return (
        <div className="container">
            <Grid container spacing={0} className="grid">
                <Grid item md={6} className="grid1">
                    <img className="fpimg" src="https://cdn.dribbble.com/userupload/5409568/file/original-d7ba3d3c3df6539206826e734bc88fa5.png?compress=1&resize=1200x900&vertical=center"/>
                </Grid>
                <Grid className="grid2" item md={6}>
                    <LoginRegisterPage/>
                </Grid>
            </Grid>
        </div>
    )
}

export default FirstPage;