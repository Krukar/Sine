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
                <label className="label" htmlFor="attempt">
                    What's this building called?
                    <input
                        aria-required="true"
                        autoFocus
                        className="input"
                        id="attempt"
                        maxLength={32}
                        name="attempt"
                        placeholder="The name of the building"
                        required={true}
                        type="text"
                    />
                </label>
            </fieldset>

            <button className="button--primary" disabled={is_loading} type="submit">
                Unlock
            </button>
        </form>
    );
}
