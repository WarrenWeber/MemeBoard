<?php
header('Access-Control-Allow-Origin: *');

$uploaddir = './images/';

$ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));

$targetfilename = uniqid() . '.' . $ext;
while(file_exists($uploaddir . $targetfilename)) {
	$targetfilename = uniqid() . '.' . $ext;
}
$targetfile = $uploaddir . $targetfilename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $targetfile)) {
    echo json_encode($targetfilename);
} else {
	echo json_encode("error");
}
?>