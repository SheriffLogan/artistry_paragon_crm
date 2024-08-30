import { useDispatch } from 'react-redux';
import { changeTopBarTheme } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

const TopBarTheme = ({ topBarTheme }) => {
    const dispatch = useDispatch();

    const handleChangeTopBarTheme = (value) => {
        dispatch(changeTopBarTheme(value));
    };

    return (
        <div className="mb-6">
            <h5 className="font-semibold text-sm mb-3">Topbar Color</h5>
            <div className="flex flex-col gap-2">
                {Object.values(layoutConstants.TopBarTheme).map((theme, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            className="form-switch form-switch-sm"
                            type="checkbox"
                            id={`topbar-color-${theme}`}
                            value={theme}
                            onChange={() => handleChangeTopBarTheme(theme)}
                            checked={topBarTheme === theme}
                        />
                        <label className="ms-1.5" htmlFor={`topbar-color-${theme}`}>
                            {theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase().replace(/-/g, ' ')}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopBarTheme;
