import { useDispatch } from 'react-redux';
import { changeSideBarType } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

const SideBarType = ({ sideBarType }) => {
    const dispatch = useDispatch();

    const handleChangeSideBarType = (value) => {
        dispatch(changeSideBarType(value));
    };

    return (
        <div className="mb-6">
            <h5 className="font-semibold text-sm mb-3">Sidenav View</h5>
            <div className="flex flex-col gap-2">
                {Object.values(layoutConstants.SideBarType).map((type, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            className="form-switch form-switch-sm"
                            type="checkbox"
                            id={`sidenav-view-${type}`}
                            value={type}
                            onChange={() => handleChangeSideBarType(type)}
                            checked={sideBarType === type}
                        />
                        <label className="ms-1.5" htmlFor={`sidenav-view-${type}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace(/-/g, ' ')}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBarType;
