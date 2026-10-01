export default function Component({
    handle_change,
    handle_submit,
    is_loading,
}: {
    handle_change: React.ChangeEventHandler<HTMLInputElement>;
    handle_submit: React.SubmitEventHandler<HTMLFormElement>;
    is_loading: boolean;
}) {
    return (
        <form className="form" onSubmit={handle_submit}>
            <fieldset className="fieldset">
                <label className="label" htmlFor="name">
                    Select an image
                    <input
                        accept="image/jpeg,image/png,image/webp"
                        aria-required="true"
                        className="input"
                        id="avatar"
                        name="avatar"
                        onChange={handle_change}
                        required={true}
                        type="file"
                    />
                </label>
            </fieldset>

            <button className="button--primary" disabled={is_loading} type="submit">
                Update Avatar
            </button>
        </form>
    );
}
