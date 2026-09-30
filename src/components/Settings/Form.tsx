export default function Component({
    area_code,
    drake_album,
    handle_change,
    handle_submit,
    is_loading,
    name,
    neighbourhood,
}: {
    area_code: string;
    drake_album: string;
    handle_change: (key: string, value: string) => void;
    handle_submit: React.SubmitEventHandler<HTMLFormElement>;
    is_loading: boolean;
    name: string;
    neighbourhood: string;
}) {
    return (
        <form className="form" onSubmit={handle_submit}>
            <fieldset className="fieldset">
                <label className="label" htmlFor="name">
                    What do they call you in Toronto?
                    <input
                        aria-required="true"
                        autoFocus
                        className="input"
                        id="name"
                        maxLength={128}
                        name="name"
                        onChange={(e) => handle_change('name', e.target.value)}
                        placeholder="Aubrey Drake Graham"
                        required={true}
                        type="text"
                        value={name}
                    />
                </label>

                <label className="label" htmlFor="area_code">
                    What's your area code?
                    <select
                        className="input"
                        name="area_code"
                        value={area_code}
                        onChange={(e) => handle_change('area_code', e.target.value)}
                    >
                        {['416', '647', '437', '942'].map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                        <option value="">None of the above</option>
                    </select>
                </label>

                <label className="label" htmlFor="neighbourhood">
                    Which of the 6ix do you represent?
                    <select
                        className="input"
                        name="neighbourhood"
                        value={neighbourhood}
                        onChange={(e) => handle_change('neighbourhood', e.target.value)}
                    >
                        {[
                            { key: 'old_toronto', label: 'Old Toronto' },
                            { key: 'etobicoke', label: 'Etobicoke' },
                            { key: 'north_york', label: 'North York' },
                            { key: 'scarborough', label: 'Scarborough' },
                            { key: 'york', label: 'York' },
                            { key: 'east_york', label: 'East York' },
                        ].map(({ key, label }) => (
                            <option key={key} value={label}>
                                {label}
                            </option>
                        ))}
                        <option value="">None of the above</option>
                    </select>
                </label>

                <label className="label" htmlFor="drake_album">
                    Drake's best album?
                    <select
                        className="input"
                        name="drake_album"
                        value={drake_album}
                        onChange={(e) => handle_change('drake_album', e.target.value)}
                    >
                        {[
                            { key: 'thank_me_later', label: 'Thank Me Later' },
                            { key: 'take_care', label: 'Take Care' },
                            { key: 'nothing_was_the_same', label: 'Nothing Was the Same' },
                            { key: 'views', label: 'Views' },
                            { key: 'scorpion', label: 'Scorpion' },
                            { key: 'certified_lover_boy', label: 'Certified Lover Boy' },
                            { key: 'honestly_nevermind', label: 'Honestly, Nevermind' },
                            { key: 'for_all_the_dogs', label: 'For All the Dogs' },
                            { key: 'iceman', label: 'Iceman' },
                            { key: 'maid_of_honour', label: 'Maid of Honour' },
                            { key: 'habibti', label: 'Habibti' },
                        ].map(({ key, label }) => (
                            <option key={key} value={label}>
                                {label}
                            </option>
                        ))}
                        <option value="">None of the above</option>
                    </select>
                </label>
            </fieldset>

            <button className="button--primary" disabled={is_loading} type="submit">
                Save
            </button>
        </form>
    );
}
