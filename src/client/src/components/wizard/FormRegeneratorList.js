/*
 * Copyright 2015 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component, PropTypes } from 'react';

import {
    Button
} from 'react-bootstrap';

class FormRegeneratorList extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitStep = this.handleSubmitStep.bind(this);
    }

    handleSubmitStep(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.onSubmitStep) {
            var generatorName = e.currentTarget.attributes['data-generator-name'].value;
            this.props.onSubmitStep({
                generatorName: generatorName
            });
        }
    }

    render() {
        let generatorItems = [];
        if(this.props.generatorList && this.props.generatorList.length > 0){
            this.props.generatorList.forEach( (generator, index) => {
                if(generator.config.isRegenerator === true){
                    generatorItems.push(
                        <a className="list-group-item" href="#"
                           key={'generator' + generator.config.name + index}
                           style={{position: 'relative'}}
                           data-generator-name={generator.config.name}
                           onClick={this.handleSubmitStep}>
                            <span>{generator.config.description}</span>
                        </a>
                    );
                }
            });
        }
        if(generatorItems.length === 0){
            generatorItems.push(
                <p className="text-center">
                    <span>There are no installed generators which are able to regenerate the source code</span>
                </p>
            );
        }
        return (
            <div style={this.props.formStyle}>
                <h5 className='text-center'>Select appropriate generators' pack</h5>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                        <td style={{width: '20%'}}></td>
                        <td>
                            <div style={{ maxHeight: '22em', width: '100%', overflow: 'auto'}}>
                                <div className="list-group">
                                    {generatorItems}
                                </div>
                            </div>
                        </td>
                        <td style={{width: '20%'}}></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default FormRegeneratorList;
