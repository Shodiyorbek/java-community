import React, {Component} from 'react';
import "../home.css"
class Category extends Component {
    render() {
        return (

                <div className="left-side">


                    <div className="card">
                        <div className="card-header">
                            <a className="card-link" data-toggle="collapse" href="java-community/src/admin#collapseOne">
                                <i className='bx bx-chevron-left arrow'></i><span>Kotlin overview</span>
                            </a>
                        </div>
                        <div id="collapseOne" className="collapse " data-parent="#accordion">
                            <div className="card-body">
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                                <li>Kotlin Multiplatform</li>
                            </div>
                        </div>
                    </div>






                </div>

        );
    }
}

export default Category;