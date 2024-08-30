import { useDispatch } from 'react-redux';
import { changeSideBarTheme } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

const SideBarTheme = ({ sideBarTheme }) => {
    const dispatch = useDispatch();

    const handleChangeSideBarTheme = (value) => {
        dispatch(changeSideBarTheme(value));
    };

    return (
        <div className="mb-6">
            <h5 className="font-semibold text-sm mb-3">Menu Color</h5>
            <div className="flex flex-col gap-2">
                {Object.values(layoutConstants.SideBarTheme).map((theme, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            className="form-switch form-switch-sm"
                            type="checkbox"
                            id={`menu-color-${theme}`}
                            value={theme}
                            onChange={() => handleChangeSideBarTheme(theme)}
                            checked={sideBarTheme === theme}
                        />
                        <label className="ms-1.5" htmlFor={`menu-color-${theme}`}>
                            {theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase()}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBarTheme;
