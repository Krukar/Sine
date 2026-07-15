const districts = [
    { key: 'old_toronto', value: 'Old Toronto' },
    { key: 'etobicoke', value: 'Etobicoke' },
    { key: 'scarborough', value: 'Scarborough' },
    { key: 'york', value: 'York' },
    { key: 'north_york', value: 'North York' },
    { key: 'east_york', value: 'East York' },
];

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
                <label className="label" htmlFor="file">
                    Please select a video file
                    <input
                        accept="video/*"
                        aria-required="true"
                        className="border-b-2 border-neutral"
                        id="file"
                        name="file"
                        required={true}
                        type="file"
                    />
                </label>

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

            <fieldset className="fieldset">
                <legend className="legend">What neighbourhood are you from?</legend>

                <div className="grid grid-cols-2 lg:grid-cols-6">
                    {districts.map(({ key, value }) => (
                        <label className="radio" htmlFor={key} key={key}>
                            <span>{value}</span>

                            <input id={key} type="radio" name="district" required value={value} />
                        </label>
                    ))}
                </div>
            </fieldset>

            <button className="button--primary" disabled={is_loading} type="submit">
                Create Sine
            </button>
        </form>
    );
}
