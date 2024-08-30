import { useDispatch } from 'react-redux';
import { changeLayoutDirection } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

const LayoutDirection = ({ layoutDirection }) => {
    const dispatch = useDispatch();

    const handleChangeLayoutDirection = (value) => {
        dispatch(changeLayoutDirection(value));
    };

    return (
        <div className="mb-6">
            <h5 className="font-semibold text-sm mb-3">Direction</h5>
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <input 
                        className="form-switch form-switch-sm" 
                        type="checkbox" 
                        name="dir" 
                        id="direction-ltr" 
                        value={layoutConstants.LayoutDirection.LEFT_TO_RIGHT} 
                        onChange={(e) => handleChangeLayoutDirection(e.target.value)} 
                        checked={layoutDirection === layoutConstants.LayoutDirection.LEFT_TO_RIGHT}
                    />
                    <label className="ms-1.5" htmlFor="direction-ltr">LTR</label>
                </div>

                <div className="flex items-center">
                    <input 
                        className="form-switch form-switch-sm" 
                        type="checkbox" 
                        name="dir" 
                        id="direction-rtl" 
                        value={layoutConstants.LayoutDirection.RIGHT_TO_LEFT} 
                        onChange={(e) => handleChangeLayoutDirection(e.target.value)} 
                        checked={layoutDirection === layoutConstants.LayoutDirection.RIGHT_TO_LEFT}
                    />
                    <label className="ms-1.5" htmlFor="direction-rtl">RTL</label>
                </div>
            </div>
        </div>
    );
};

export default LayoutDirection;
