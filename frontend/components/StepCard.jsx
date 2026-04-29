function Step({ title, text }) {

    return (

        <div className="col-md-4">

            <div className="card border-0 shadow-sm p-4 h-100">

                <h5 className="fw-semibold">
                    {title}
                </h5>

                <p className="text-muted">
                    {text}
                </p>

            </div>

        </div>

    );

}

export default Step;