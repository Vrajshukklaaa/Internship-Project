<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'topic_id'=>$this->topic_id,
            'question' => $this->question,
            'explanation' => $this->explanation,
            'revisiontext' => $this->revisiontext,
            'video' => $this->video,
            'options'=>$this->getOptions()
        ];
    }
}
