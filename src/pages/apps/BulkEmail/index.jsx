import { useState } from 'react'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'

import { PageBreadcrumb } from '../../../components'

import 'react-quill/dist/quill.snow.css'

//image
import Img1 from '@/assets/images/small/small-1.jpg'
import Img2 from '@/assets/images/small/small-2.jpg'
import Img3 from '@/assets/images/small/small-3.jpg'
import Img4 from '@/assets/images/small/small-4.jpg'


const colors= ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']





const BulkEmail = () => {
    const [editorValue, setEditorValue] = useState(`
        <h3>This is a simple editable area.</h3>
        <p>
          End of simple area
        </p>`)

	return (
		<>
			<PageBreadcrumb title="Bulk Email" subName="Apps" />
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
            
                <div className="overflow-hidden m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                    <div className="p-1.5">
                        <div className="px-6 pt-6 pb-0">
                            <form>
                                <div className="mb-3 space-y-2">
                                    <label htmlFor="msgto" className="text-gray-500 font-semibold">
                                        To
                                    </label>
                                    <input type="text" id="msgto" className="form-input" placeholder="Example@email.com" />
                                </div>

                                <div className="mb-3 space-y-2">
                                    <label htmlFor="mailsubject" className="text-gray-500 font-semibold">
                                        Subject
                                    </label>
                                    <input type="text" id="mailsubject" className="form-input" placeholder="Your subject" />
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-500 font-semibold mb-2">Message</label>
                                    <div className="mb-10">
                                        <ReactQuill
                                            theme="snow"
                                            value={editorValue}
                                            onChange={setEditorValue}
                                            style={{ height: 200 }}
                                            modules={{
                                                toolbar: {
                                                    container: [['bold', 'italic', 'underline', 'strike'], 
                                                                [{ color: [] }], ['blockquote', 'code-block'], 
                                                                [{ list: 'ordered' }, { list: 'bullet' }], 
                                                                ['link', 'image', 'video']],
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center gap-1 px-6 py-6">
                            <button type="button" className="btn bg-primary text-white">
                                <i className="ri-send-plane-2-line me-1"></i> Send Message
                            </button>
                            <button type="button" className="btn bg-light text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                Cancel
                            </button>
                        </div>
                    </div>
                
                </div>
            <div className="mt-3">
					<div className="grid lg:grid-cols-3 gap-6">
                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img1} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">USP Based</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img2} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">New Launch</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img3} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">Offer/Discount</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img4} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">Webinar Invitation</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        
					    </div>

                            <div className='flex justify-center '>
                                <div className="flex flex-wrap items-center gap-3 mt-5 ">
                                            <button type="button" className={`btn border-${colors[0]} text-${colors[0]} hover:bg-${colors[0]} hover:text-white`}>
                                                See More
                                            </button>
                                </div>
                            </div>
				</div>
        </div>

		</>
	)
}

export default BulkEmail;
