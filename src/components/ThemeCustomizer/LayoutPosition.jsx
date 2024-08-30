import { useDispatch } from 'react-redux';
import { changeLayoutPosition } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

const LayoutPosition = ({ layoutPosition }) => {
    const dispatch = useDispatch();

    const handleChangeLayoutPosition = (value) => {
        dispatch(changeLayoutPosition(value));
    };

    return (
        <div>
            <h5 className="font-semibold text-sm mb-3">Layout Position</h5>
            <div className="flex btn-radio">
                <input 
                    type="radio" 
                    className="form-radio hidden" 
                    name="data-layout-position" 
                    id="layout-position-fixed" 
                    value={layoutConstants.LayoutPosition.POSITION_FIXED} 
                    onChange={(e) => handleChangeLayoutPosition(e.target.value)} 
                    checked={layoutPosition === layoutConstants.LayoutPosition.POSITION_FIXED}
                />
                <label className="btn rounded-e-none bg-gray-100 dark:bg-gray-700" htmlFor="layout-position-fixed">Fixed</label>

                <input 
                    type="radio" 
                    className="form-radio hidden" 
                    name="data-layout-position" 
                    id="layout-position-scrollable" 
                    value={layoutConstants.LayoutPosition.POSITION_SCROLLABLE} 
                    onChange={(e) => handleChangeLayoutPosition(e.target.value)} 
                    checked={layoutPosition === layoutConstants.LayoutPosition.POSITION_SCROLLABLE}
                />
                <label className="btn rounded-s-none bg-gray-100 dark:bg-gray-700" htmlFor="layout-position-scrollable">Scrollable</label>
            </div>
        </div>
    );
};

export default LayoutPosition;
