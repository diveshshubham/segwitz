const appRouter = (app) => {

    const { check, validationResult } = require("express-validator/check");
    const db_client = require('../config/database');


    app.post("/sales", [
        //validating data
        check("userName", "it's mandatory").not().isEmpty(),
        check("date", "it's mandatory").not().isEmpty(),
        check("amount", "it's mandatory").not().isEmpty()],

        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const userName = req.body.userName;
                const amount = req.body.amount;
                const date = req.body.date;
                {
                    let SQL_ADD_SALES = `INSERT INTO sales_test
                    (username, amount, "date")
                    VALUES($1, $2, $3) RETURNING id`;

                    let add_sales = await db_client.query(SQL_ADD_SALES,
                        [userName, amount, date]);

                    add_sales = add_sales.rows[0].id

                    res.send({ message: "sucessfully added with id " + add_sales + "" });
                }
            } catch (err) {
                console.log(err.message);
                res.status(400).send("Bad Request");
            }
        });



    app.get("/sales", async (req, res) => {

        const filter = req.query.filter;
        const input_date = req.query.input_date;

        let res = null;
        let SQL_GET_SALES = `SELECT SUM (amount) as "total" from sales_test st WHERE`

        try {
            //specific date filter (optional)
            if (filter === "specific_date") {

                SQL_GET_SALES += " date::date = $1"
                let get_res = await db_client.query(SQL_GET_SALES,
                    ['' + input_date + ''])

                res = get_res.rows[0].total

            }

            //daily filter
            if (filter === "daily") {

                SQL_GET_SALES += ` date::date = NOW()::date`
                let get_res = await db_client.query(SQL_GET_SALES)

                res = get_res.rows[0].total
            }

            //week filter
            if (filter === "weekly") {

                let SQL_WEEK_SUM = `SELECT date_part('year', date::date) as year,
                    date_part('week', date::date) AS week,
                    SUM(amount)           
                    FROM sales_test st 
                    GROUP BY year, week
                    ORDER BY year, week`

                let get_week_stats = await db_client.query(SQL_WEEK_SUM)
                get_week_stats = get_week_stats.rows
                res = get_week_stats
            }

            //month filter
            if (filter === "month") {

                let SQL_MONTH_SUM = `SELECT date_part('year', date) AS "year",
                    date_part('month', date) AS "month",
                    sum(amount) as "sum"
                    FROM sales_test st 
                    GROUP BY year, month
                    order by month`

                let get_month_stats = await db_client.query(SQL_MONTH_SUM)
                get_month_stats = get_month_stats.rows
                res = get_month_stats
            }

            res.send({ message:"success", res });
        }

        catch (err) {
            console.log(err.message);
            res.status(400).send("oops! Bad Request");
        }

    });
}

module.exports = appRouter;