import { useDispatch } from 'react-redux';
import { changeLayoutTheme } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

const LayoutTheme = ({ layoutTheme }) => {
    const dispatch = useDispatch();

    const handleChangeLayoutTheme = (value) => {
        dispatch(changeLayoutTheme(value));
    };

    return (
        <div className="mb-6">
            <h5 className="font-semibold text-sm mb-3">Theme</h5>
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <input 
                        className="form-switch form-switch-sm" 
                        type="checkbox" 
                        name="data-mode" 
                        id="layout-color-light" 
                        value={layoutConstants.LayoutTheme.THEME_LIGHT} 
                        onChange={(e) => handleChangeLayoutTheme(e.target.value)} 
                        checked={layoutTheme === layoutConstants.LayoutTheme.THEME_LIGHT}
                    />
                    <label className="ms-1.5" htmlFor="layout-color-light">Light</label>
                </div>

                <div className="flex items-center">
                    <input 
                        className="form-switch form-switch-sm" 
                        type="checkbox" 
                        name="data-mode" 
                        id="layout-color-dark" 
                        value={layoutConstants.LayoutTheme.THEME_DARK} 
                        onChange={(e) => handleChangeLayoutTheme(e.target.value)} 
                        checked={layoutTheme === layoutConstants.LayoutTheme.THEME_DARK}
                    />
                    <label className="ms-1.5" htmlFor="layout-color-dark">Dark</label>
                </div>
            </div>
        </div>
    );
};

export default LayoutTheme;
