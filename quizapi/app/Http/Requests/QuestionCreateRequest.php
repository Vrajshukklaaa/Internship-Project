<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
// use Illuminate\Validation\Rules\Password;

class QuestionCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function rules(): array
    {

        return [
            'topic_id'=>'required',
            'question' => 'required',
            'explanation' => 'required',
            'revisiontext' => 'required',
            'video' => 'nullable',
            'options'=>[
                'option_key' => 'required',
                'option_value' => 'required',
                'is_correct' => 'required'
            ],
            
           
        ];
    }
}
