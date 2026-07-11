export default function Form({
    handle_change,
    handle_submit,
    is_loading,
}: {
    handle_change: React.ChangeEventHandler<HTMLFormElement>;
    handle_submit: React.SubmitEventHandler<HTMLFormElement>;
    is_loading: boolean;
}) {
    return (
        <form className="form" onChange={handle_change} onSubmit={handle_submit}>
            <fieldset className="fieldset">
                <label className="label" htmlFor="title">
                    What's the title of your video?
                    <input
                        aria-required="true"
                        autoFocus
                        className="input"
                        id="title"
                        maxLength={256}
                        name="title"
                        placeholder="Views from the 6ix"
                        required={true}
                        type="text"
                    />
                </label>
            </fieldset>

            <button className="button--primary" disabled={is_loading} type="submit">
                Create Sine
            </button>
        </form>
    );
}

// title video which of hte 6ix are you from?
