<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class QuestionOptionUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {

        return [
            'id'=>'required',
            'question_id'=>'required',
            'option_key' => 'required',
            'option_value' => 'required',
            'is_correct' => 'required'
            
        ];
    }
}
