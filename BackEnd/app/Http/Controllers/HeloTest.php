<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HeloTest extends Controller
{
    public function helloWord(){
        return "hello word";
    }
}
