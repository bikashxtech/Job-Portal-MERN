function DashboardCard({ title, value, color, icon }) {

    return (

        <div className="col-md-3">

            <div className={`card border-0 shadow-sm bg-${color} bg-opacity-10`}>

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>
                        <h6 className="text-muted">{title}</h6>
                        <h4 className="fw-bold">{value}</h4>
                    </div>

                    <i className={`bi ${icon} fs-2 text-${color}`} />

                </div>

            </div>

        </div>

    );
}

export default DashboardCard;