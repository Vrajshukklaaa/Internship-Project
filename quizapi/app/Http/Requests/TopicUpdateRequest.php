<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class TopicUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize(): bool
    // {
    //     return true;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {

        return [
            'id'=>'required',
            'subject_id' => 'required',
            'level_id' => 'required',
            'sublevel_id' => 'required',
            'title' => 'required'
        ];
    }
}