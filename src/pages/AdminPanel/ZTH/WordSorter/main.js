// var temp_arr;
// var cache_output;
// var cache_words;
// var cache_phrases;
// var cache_temp_arr = []
// var count_w = 0;
//
// $(document).ready(function(){
//     // fetch('text.txt')
//     // .then(response => response.text())
//     // .then(text => $('#inputData').val(text));
//     var arr = [];
//     var amz_icon = '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA%2FPjxzdmcgaGVpZ2h0PSIzMiIgd2lkdGg9IjMxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yNy4xOTEgMjYuMzUyYy0xMy4xODUgNi4yNzUtMjEuMzY4IDEuMDI1LTI2LjYwNi0yLjE2NC0uMzI0LS4yMDEtLjg3NS4wNDctLjM5Ny41OTYgMS43NDUgMi4xMTYgNy40NjQgNy4yMTYgMTQuOTI5IDcuMjE2IDcuNDcgMCAxMS45MTQtNC4wNzYgMTIuNDctNC43ODcuNTUyLS43MDUuMTYyLTEuMDk0LS4zOTYtLjg2MXptMy43MDMtMi4wNDVjLS4zNTQtLjQ2MS0yLjE1My0uNTQ3LTMuMjg1LS40MDgtMS4xMzQuMTM1LTIuODM2LjgyOC0yLjY4OCAxLjI0NC4wNzYuMTU2LjIzMS4wODYgMS4wMS4wMTYuNzgxLS4wNzggMi45NjktLjM1NCAzLjQyNS4yNDIuNDU4LjYtLjY5OCAzLjQ1OS0uOTA5IDMuOTItLjIwNC40NjEuMDc4LjU4LjQ2MS4yNzMuMzc4LS4zMDcgMS4wNjItMS4xMDIgMS41MjEtMi4yMjcuNDU2LTEuMTMxLjczNC0yLjcwOS40NjUtMy4wNnoiIGZpbGw9IiNGNEI0NTkiLz48cGF0aCBkPSJNMjMuODU0IDE2LjM5MXYtMTAuNTA4YzAtMS44MDUtMS43NDYtNS44ODMtOC4wMjEtNS44ODMtNi4yNzQgMC05LjYxMiAzLjkyMS05LjYxMiA3LjQ1M2w1LjI0NC40NjlzMS4xNjgtMy41MyAzLjg3OS0zLjUzIDIuNTI1IDIuMTk2IDIuNTI1IDIuNjcxdjIuMjgzYy0zLjQ3My4xMTctMTIuMDk3IDEuMTA5LTEyLjA5NyA4LjM4MSAwIDcuODIgOS44NzEgOC4xNDggMTMuMTA4IDMuMDk0LjEyNS4yMDUuMjY3LjQwNi40NDUuNTk0IDEuMTkxIDEuMjUyIDIuNzggMi43NDQgMi43OCAyLjc0NGw0LjA0OC00Yy4wMDItLjAwMS0yLjI5OS0xLjgwNy0yLjI5OS0zLjc2OHptLTExLjk5NS4zNjljMC0zLjM1OSAzLjU5OS00LjA0IDYuMDExLTQuMTJ2Mi44OTFjLS4wMDEgNS43MjctNi4wMTEgNC44Ni02LjAxMSAxLjIyOXoiIGZpbGw9IiM0ODQ4NDgiLz48L3N2Zz4%3D">';
//     var trslt_icon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPESURBVGhD7ZjtS1NRHMd95f/QG1NLCt9VVC8KhCIig6KYUElhJWYvNBBTs1ILRBtapm4+kQVKmklPmg8pKpaP5TQfNtMVrMwiSvRuPk9/3XN37nTbTznbLteCfeED2z3n/s7nd3fP5TIvTzzxxJN/M36qqaN+Km7MT20EV9isNu2gpTYmvmruGybGDpdNS21McCmn+B1YAd60nPxBhJwnl1PQcvIHFXISX7WxmpaTP5iQs/D7aNEn37SJlpQ3mJAr+Kq4OFpS3mAyrrD/0ST0DutdRqPTj2k+6YOpFnswGXuSWudATELzHDqHUN5lQOVY4Zv4SrXYg4nY0/vTTPUBusfN6BxCxMtfqJgzUC32YCKrOfB4mqpbsswTVDqNzg0s5KBT+xkVY4VqsQcTWU3uh3lB/Nf0MkzMEn2ArO55dC4hq+U7KsYK1WIPJiGyJc8IY5xFunRwASp0C8Jnw9QS+CPzCcfK/qBirFAt9mASIqdfzAjCJKGvZiCseuW74tkMeg5pur7vCyrHAtViDyYhIl5xcuts5cUC8o0wOWf5RcqGFtBzCAm1PxzEFNGJAvbH7aFa7MEECIGFRjDOW2TLtSuyT2lTHD+2vcDxPMLe4ino0dmKyd5AdMOsILpeot7MoucSDl8rsEqzIHkDLYaVZ/9aaebnYOcSdqV3oKJrIWkDex6ZwGy5e+DFyKLD+KvRRWHMvASw+6HJYZywPZ+DtgE9tPb0W+VEYu/kCNLphSUOY1SLPdjiqW0rrw4RtY63SSR/TAyZaz8ucjKzDsJvpkHHR61VsLSqXpA/F3+bPz5kI0+gWuzBFtb+5i8tH7KJtyEblWxecYOTufbjIjuzLZs3VpkDH7Qj0NjZA6FXU4RjD5/XOMhL1oCUhNzIFYTjM9VwOVkpfE7KLkLlCVSLPdiiUhJZaYDQWMtVJ1xOUkLngA6VJ1At9mCLSsmOokmISM6wNnDpZjq0vO9D5QlUiz3YolJzKPEBXLieChG8PGni7NVbUFbT+P80sO9+P7zTDApPo8S7edZfI0VVDO19tk8iqsUebEGpCcjjoHXA8oKn0Y1CUWUVnIpJEpq4knrPvQbc/2eOjdTGcRvRpm4NxGWo4Ulds81xqsUe/zxTsBxNHCyZsBFdC6olb46H1RmCTryG9UhTdaHC9tCS8kYR3hCFSYuwyhNoSXkTGFLhfeRM7Zy78gRaUv5cjGmqcFeeQMvJn7PRb30OKmrckifQchuT8zFNw+7Iu/TPnJRJVLafc0e+Tzd6mJbyxBNPPPmn4uX1F2I7DwbOG5FNAAAAAElFTkSuQmCC">';
//     var arrow = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 220.682 220.682" style="enable-background:new 0 0 220.682 220.682;" xml:space="preserve">\
//                     <g>\
//                         <polygon points="92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639  " fill="#91DC5A"/>\
//                         <polygon points="28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758  " fill="#91DC5A"/>\
//                     </g></svg>';
//
//     var link_arrow = '<a class="arrow" href="javascript:void(0)" onclick=transfer(this)>' + arrow + '</a>';
//
//     //Button Start onClick
//     $('#start').on('click', function(){
//         $('#output').empty();
//         $('#history').empty();
//         $('#phrases').empty();
//         arr = $('#inputData').val().split('\n');
//         let unq = [];
//         $.each(arr, (i, el) =>{
//             if ($.inArray(el, unq) === -1) {
//                 el = el.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//
//                 unq.push(el);
//             };
//         })
//         temp_arr = unq.slice(0);
//         let count = arr.length;
//         let diff = arr.length;
//         arr = unq.slice(0);
//         diff -= arr.length;
//         let closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
//
//         $('#excess-data').val().split('\n').forEach((item) =>{
//             if(item){
//                 let re = new RegExp('(\\s|^)+' + item.trim() + '+(\\s|$)', 'gm');
//                 arr.forEach((str, index) =>{
//                     if(str.search(re) != -1){
//                         arr.splice(index, 1, "");
//                         let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + str.replace(/\s/g, '+');
//                         let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + str;
//                         let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                         $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" keyword="' + item + '" key="' + index + '" role="alert"><a class="amz-link" target="_blank" rel="noopener noreferrer" href='+ link + '>' +amz_icon + '</a>' + translate_module + str + closeButton + '</li>');
//                         // $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" keyword="' + item + '" key="' + index + '" role="alert">' + str + closeButton + '</li>')
//                     }
//                 })
//                 $('#history').append('<li class="alert alert-success alert-dismissible fade show" role="alert"><span sel="false" onclick=select_word(this)>' + item+ '</span>' + closeButton + '</li>');
//                 // $('#history').append('<li class="alert alert-success alert-dismissible fade show" sel="false" onclick=select_word(this) role="alert">' + item + closeButton + '</li>');
//             }
//         })
//
//         arr.forEach(function(str, index){
//             if(str != ""){
//
//                 let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + str.replace(/\s/g, '+');
//                 let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + str;
//                 let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                 var line = '<li class="alert alert-secondary ' + index +'" role="alert"><a class="amz-link" target="_blank" onclick="checkInput(this)" rel="noopener noreferrer" href='+ link + '>' +amz_icon + '</a>' + translate_module + '<div class="phrase">';
//                 let words = str.split(' ');
//                 words.forEach(elem => {
//                     line += '<span>'+elem+' ' + '</span>';
//                 })
//                 line +='&nbsp' + link_arrow + '</div><div class="close"><input  style="display:inline-block; vertical-align:middle;" type="checkbox"/></div></li>';
//                 $('#output').append(line);
//             }
//         });
//         $(this).prop("disabled",true);
//         $('#inputData').prop("disabled", true);
//         $('#excess-data').prop("disabled", true);
//         $('#input-block .trash').prop("disabled", true);
//
//         // $(this).attr('disabled', '1');
//         $('#input-block .badge').text(count + ' ('+ diff +')');
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_words = $('#history li').length;
//         $('#words-block h3 span').text(col_words);
//         let col_phrases = $('#phrases li').length;
//         $('#phrases-block h3 span').text(col_phrases);
//
//         cache_output = $('#output li');
//     });
//
//     let idx_del = -1;
//     let searchWordShift = [];
//
//     // Delete alone words
//     $('#alone').click(function(){
//         cache_output = $('#output li');
//         let t = [];
//         arr.forEach(function(el){
//             if(el.split(' ').length > 1){
//                 t.push(el);
//             }
//         })
//         arr = t.slice(0);
//         $('#output').empty();
//         temp_arr = arr.slice(0);
//         arr.forEach(function(str, index){
//             if(str != ""){
//                 let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + str.replace(/\s/g, '+');
//                 let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + str;
//                 let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                 var line = '<li class="alert alert-secondary ' + index +'" role="alert"><a class="amz-link" target="_blank" onclick="checkInput(this)" rel="noopener noreferrer" href='+ link + '>' +amz_icon + '</a>' + translate_module + '<div class="phrase">';
//                 let words = str.split(' ');
//                 words.forEach(elem => {
//                     line += '<span>'+elem+' ' + '</span>';
//                 })
//                 line +='&nbsp' + link_arrow + '</div><div class="close"><input  style="display:inline-block; vertical-align:middle;" type="checkbox"/></div></li>';
//                 $('#output').append(line);
//             }
//         });
//
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         $('#alone').prop("disabled", true);
//     });
//
//     // Clear searchWord
//     $(document).keyup((event) =>{
//         if(event.keyCode == 17 || event.wich == 17){
//             let searchWord = searchWordShift.slice(0);
//             let closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
//             let style = '';
//             let sel = 'false';
//             let deleteArr = [];
//             if (count_w != 0){
//                 style = 'style="font-weight: bold"';
//                 sel = 'true';
//             }
//             if(idx_del !== -1){
//                 $.each(searchWord, (idx, elem)=>{
//
//                     $('#history').append('<li class="alert alert-success alert-dismissible fade show"'+style+' role="alert"><span sel="'+sel+'" onclick=select_word(this)>' + elem + '</span>' + closeButton + '</li>');
//                     for(var i=0; i<temp_arr.length; i++){
//                         let re = new RegExp('(\\s|^)+' + elem + '+(\\s|$)', 'gm');
//                         if(temp_arr[i].search(re) != -1){
//                             let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + temp_arr[i].replace(/\s/g, '+');
//                             let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + temp_arr[i];
//                             let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                             $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" keyword="' + elem + '" key="' + i + '" role="alert"><a class="amz-link" target="_blank" rel="noopener noreferrer" onclick="checkInput(this)" href='+ link + '>' +amz_icon + '</a>' + translate_module + temp_arr[i] + closeButton + '</li>');
//                             if(idx_del != i){
//                                 deleteArr.push(i);
//                             }
//                             else{
//                                 temp_arr.splice(i, 1, "");
//                             }
//                         }
//                     }
//                     deleteArr.reverse();
//                     deleteArr.forEach(function(item){
//                         $('li.' + item.toString()).remove();
//                         temp_arr.splice(item, 1, "");
//                     });
//                 });
//                 $('li.' + idx_del.toString()).remove();
//                 idx_del = -1;
//             }
//             searchWordShift = [];
//         }
//         if(event.keyCode == 16 || event.wich == 16){
//             let searchWord = searchWordShift.join(' ');
//             let closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
//             let style = '';
//             let sel = 'false';
//             let deleteArr = [];
//             if (count_w != 0){
//                 style = 'style="font-weight: bold"';
//                 sel = 'true';
//             }
//             if (searchWord.length > 0){
//                 $('#history').append('<li class="alert alert-success alert-dismissible fade show"'+style+' role="alert"><span sel="'+sel+'" onclick=select_word(this)>' + searchWord + '</span>' + closeButton + '</li>');
//                 for(var i=0; i<temp_arr.length; i++){
//                     let re = new RegExp('(\\s|^)+' + searchWord + '+(\\s|$)', 'gm');
//                     if(temp_arr[i].search(re) != -1){
//                         let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + temp_arr[i].replace(/\s/g, '+');
//                         let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + temp_arr[i];
//                         let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                         $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" keyword="' + searchWord + '" key="' + i + '" role="alert"><a class="amz-link" target="_blank" rel="noopener noreferrer" onclick="checkInput(this)" href='+ link + '>' +amz_icon + '</a>' + translate_module + temp_arr[i] + closeButton + '</li>');
//                         deleteArr.push(i);
//                     }
//                 }
//                 deleteArr.reverse();
//                 deleteArr.forEach(function(item){
//                     $('li.' + item.toString()).remove();
//                     temp_arr.splice(item, 1, "");
//                 });
//                 searchWordShift = [];
//             }
//         }
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_words = $('#history li').length;
//         $('#words-block h3 span').text(col_words);
//         let col_phrases = $('#phrases li').length;
//         $('#phrases-block h3 span').text(col_phrases);
//     })
//
//     //Output wordsClick
//     $('#output').on('click', 'li span', function(event){
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         cache_temp_arr = temp_arr.slice(0);
//         let deleteArr = [];
//         idx_del = -1;
//         let searchWord = [];
//         // let searchWordShift = '';
//         let closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
//         let style = '';
//         let sel = 'false';
//         if (count_w != 0){
//             style = 'style="font-weight: bold"';
//             sel = 'true';
//         }
//         if(event.ctrlKey){
//             searchWordShift.push($(this).text().trim());
//             let cls_ = $(this).closest('li').attr('class');
//             cls_ =  cls_.split(' ');
//             idx_del = cls_[2];
//         }
//         else if (event.shiftKey){
//             let cls_ = $(this).closest('li').attr('class');
//             cls_ =  cls_.split(' ');
//             idx_del = cls_[2];
//             searchWordShift.push($(this).text().trim());
//
//         }
//         else{
//             searchWord.push($(this).text().trim());
//             $.each(searchWord, (idx, elem)=>{
//                 $('#history').append('<li class="alert alert-success alert-dismissible fade show"'+style+' role="alert"><span sel="'+sel+'" onclick=select_word(this)>' + elem + '</span>' + closeButton + '</li>');
//                 for(var i=0; i<temp_arr.length; i++){
//                     let re = new RegExp('(\\s|^)+' + elem + '+(\\s|$)', 'gm');
//                     if(temp_arr[i].search(re) != -1){
//                         let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + temp_arr[i].replace(/\s/g, '+');
//                         let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + temp_arr[i];
//                         let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                         $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" keyword="' + elem + '" key="' + i + '" role="alert"><a class="amz-link" target="_blank" rel="noopener noreferrer" onclick="checkInput(this)" href='+ link + '>' +amz_icon + '</a>' + translate_module + temp_arr[i] + closeButton + '</li>');
//                         if(idx_del != i){
//                             deleteArr.push(i);
//                         }
//                         else{
//                             temp_arr.splice(i, 1, "");
//                         }
//                     }
//                 }
//                 deleteArr.reverse();
//                 deleteArr.forEach(function(item){
//                     $('li.' + item.toString()).remove();
//                     temp_arr.splice(item, 1, "");
//                 });
//             });
//         }
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_words = $('#history li').length;
//         $('#words-block h3 span').text(col_words);
//         let col_phrases = $('#phrases li').length;
//         $('#phrases-block h3 span').text(col_phrases);
//
//     })
//
//     function onlyUnique(value, index, self) {
//         return self.indexOf(value) === index;
//     }
//
//     // Return words
//     $('#history').on('close.bs.alert', '.alert', function(){
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         let text = $(this).text().substring(0, $(this).text().length - 1);
//         let arrPhrases = $('#phrases .alert[key*="trnsf"]');
//         let arrHistory = $('#history .alert');
//         let start_arr = $('#inputData').val().split('\n');
//         start_arr = start_arr.filter(onlyUnique);
//
//         arrPhrases.each((idx, el)=>{
//             start_arr.splice(+$(el).attr('key').split(' ')[0], 1, "");
//         });
//
//         $.each(arrHistory, (index, item) => {
//             let searchWord = $(item).text().substring(0, $(item).text().length-1);
//             if (searchWord != text){
//                 let re = new RegExp('(\\s|^)+' + searchWord + '+(\\s|$)', 'gm');
//                 $.each(start_arr, (index, elem) => {
//                     if(elem.search(re) != -1){
//                         start_arr.splice(index, 1, "")
//                     }
//                 })
//             }
//         })
//         let check_arr = [];
//         $('#output li').each((idx, el) =>{
//             if ($(el).find('.close input[type="checkbox"]').is(':checked')){
//                 // console.log($(el).attr('class').split(' '));
//                 check_arr.push($(el).attr('class').split(' ')[2]);
//             }
//         });
//
//         $('#output').empty();
//         start_arr.forEach(function(str, index){
//             if (str != ""){
//                 let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + str.replace(/\s/g, '+');
//                 let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + str;
//                 let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//                 var line = '<li class="alert alert-secondary ' + index +'"><a class="amz-link" target="_blank" rel="noopener noreferrer" onclick="checkInput(this)" href='+ link + '>' +amz_icon + '</a>' + translate_module + '<div class="phrase">';
//                 let words = str.split(' ');
//                 words.forEach(elem => {
//                     line += '<span>'+elem+' ' + '</span>';
//                 })
//                 let chk = '';
//                 check_arr.forEach(function(el){
//                     if(el == index.toString()){
//                         chk = ' checked';
//                     }
//                 })
//                 line +='&nbsp' + link_arrow + '</div><div class="close"><input  style="display:inline-block; vertical-align:middle;" type="checkbox"' + chk + '/></div></li>';
//                 $('#output').append(line);
//             }
//         });
//         $('#phrases .alert[keyword="'+text+'"]').remove();
//         temp_arr = start_arr.slice(0);
//
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_words = $('#history li').length - 1;
//         $('#words-block h3 span').text(col_words);
//         let col_phrases = $('#phrases li').length;
//         $('#phrases-block h3 span').text(col_phrases);
//     });
//
//     // Return Phrases
//     $('#phrases').on('close.bs.alert', '.alert', function(){
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         let text = $(this).text().substring(0, $(this).text().length - 1);
//         let idx = $(this).attr('key');
//         let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + text.replace(/\s/g, '+');
//         let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + text;
//         let translate_module = '<a class="trlt-link" target="_blank" onclick="checkInput(this)" href="' + link_translate + '">' + trslt_icon + '</a>';
//         let line = '<li class=" alert alert-secondary no_touch ' + idx +'"><a class="amz-link" target="_blank" rel="noopener noreferrer" onclick="checkInput(this)" href=' + link + '>' + amz_icon + '</a>'+translate_module+'<div class="phrase">';
//         text.split(' ').forEach(item => {
//             line += '<span>' + item + ' ' + '</span>';
//         })
//         line += '&nbsp' + link_arrow + '</div><div class="close"><input  style="display:inline-block; vertical-align:middle;" type="checkbox"/></div></li>';
//         $('#output').append(line);
//         temp_arr.splice(idx, 1, text);
//
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_phrases = $('#phrases li').length - 1;
//         $('#phrases-block h3 span').text(col_phrases);
//     })
//
//     function count(){
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_words = $('#history li').length;
//         $('#words-block h3 span').text(col_words);
//         let col_phrases = $('#phrases li').length;
//         $('#phrases-block h3 span').text(col_phrases);
//     }
//
//     // Copy Output
//     $('#output-block').on('click', '.btn', function(){
//         let output_data = $('#output li');
//         let line = '';
//         $.each(output_data, (index, item) => {
//             item = $(item).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//             line += item + '\r\n';
//         })
//         var $temp = $("<textarea>");
//         $("body").append($temp);
//         $temp.val(line).select();
//         document.execCommand("copy");
//         $temp.remove();
//     })
//
//     // Copy Words
//     $('#words-block').on('click', '.btn', ()=>{
//         let output_data = $('#history li');
//         let line = '';
//         $.each(output_data, (index, item) => {
//             line += $(item).text().slice(0, -1) + '\r\n';
//         })
//         var $temp = $("<textarea>");
//         $("body").append($temp);
//         $temp.val(line).select();
//         document.execCommand("copy");
//         $temp.remove();
//     })
//
//     // Copy Phrases
//     $('#phrases-block').on('click', '.btn', () => {
//         let output_data = $('#phrases li');
//         let line = ''
//         $.each(output_data, (index, item) => {
//             line += $(item).text().slice(0, -1) + '\r\n';
//         })
//         var $temp = $("<textarea>");
//         $("body").append($temp);
//         $temp.val(line).select();
//         document.execCommand("copy");
//         $temp.remove();
//     })
//
//     // Back button
//     $('#back').on('click', () =>{
//         $('#output').empty();
//         temp_arr = cache_temp_arr.slice(0);
//         $.each(cache_output, (idx, elem) => {
//             $('#output').append(elem);
//             // temp_arr.push($(elem).find('.phrase').text().trim());
//         })
//         $('#history').empty();
//         $.each(cache_words, (idx, elem) => {
//             $(elem).addClass('show');
//             $('#history').append(elem);
//         })
//         $('#phrases').empty();
//         $.each(cache_phrases, (idx, elem) => {
//             $(elem).addClass('show');
//             $('#phrases').append(elem);
//         })
//         let col_words = $('#history li').length;
//         $('#words-block h3 span').text(col_words);
//         let col_output = $('#output li').length;
//         $('#output-block h3 span').text(col_output);
//         let col_phrases = $('#phrases li').length;
//         $('#phrases-block h3 span').text(col_phrases);
//
//     })
//
//     // Clear Input
//     $('#yInput').click(()=>{
//         $('#modalInput').modal('hide');
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         $('#output').empty();
//         $('#inputData').val('');
//         $('#excess').val('');
//         $('#history').empty();
//         $('#phrases').empty();
//         count();
//         $('#input-block h3 span').text('0');
//         $('#inputData').prop("disabled", false);
//         $('#excess-data').prop("disabled", false);
//         $('#start').prop("disabled", false);
//     })
//
//     // Clear output
//     $('#yOutput').click(()=>{
//         $('#modalOutput').modal('hide');
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         $('#output').empty();
//         $('#history').empty();
//         $('#phrases').empty();
//         $('#inputData').prop("disabled", false);
//         $('#excess-data').prop("disabled", false);
//         $('#start').prop("disabled", false);
//         $('#input-block .trash').prop("disabled", false);
//
//         count();
//     })
//
//     // Clear words
//     $('#yHistory').click(()=>{
//         $('#modalHistory').modal('hide');
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         $('#history').empty();
//         $('#phrases').empty();
//         count();
//     })
//
//     // Clear phrases
//     $('#yPhrases').click(()=>{
//         $('#modalPhrases').modal('hide');
//         cache_output = $('#output li');
//         cache_words = $('#history li');
//         cache_phrases = $('#phrases li');
//         $('#phrases').empty();
//         count();
//     })
// })
//
// // Link click
// function checkInput(element){
//     $(element).parent('li').find('input').prop('checked', true);
// }
//
// // Trasfer alone element
// function transfer(element){
//     cache_output = $('#output li');
//     cache_words = $('#history li');
//     cache_phrases = $('#phrases li');
//     let closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
//     text = $(element).parent('div').text().trim();
//     cls = $(element).closest('li').attr('class').split(' ')[2];
//     let trslt_icon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPESURBVGhD7ZjtS1NRHMd95f/QG1NLCt9VVC8KhCIig6KYUElhJWYvNBBTs1ILRBtapm4+kQVKmklPmg8pKpaP5TQfNtMVrMwiSvRuPk9/3XN37nTbTznbLteCfeED2z3n/s7nd3fP5TIvTzzxxJN/M36qqaN+Km7MT20EV9isNu2gpTYmvmruGybGDpdNS21McCmn+B1YAd60nPxBhJwnl1PQcvIHFXISX7WxmpaTP5iQs/D7aNEn37SJlpQ3mJAr+Kq4OFpS3mAyrrD/0ST0DutdRqPTj2k+6YOpFnswGXuSWudATELzHDqHUN5lQOVY4Zv4SrXYg4nY0/vTTPUBusfN6BxCxMtfqJgzUC32YCKrOfB4mqpbsswTVDqNzg0s5KBT+xkVY4VqsQcTWU3uh3lB/Nf0MkzMEn2ArO55dC4hq+U7KsYK1WIPJiGyJc8IY5xFunRwASp0C8Jnw9QS+CPzCcfK/qBirFAt9mASIqdfzAjCJKGvZiCseuW74tkMeg5pur7vCyrHAtViDyYhIl5xcuts5cUC8o0wOWf5RcqGFtBzCAm1PxzEFNGJAvbH7aFa7MEECIGFRjDOW2TLtSuyT2lTHD+2vcDxPMLe4ino0dmKyd5AdMOsILpeot7MoucSDl8rsEqzIHkDLYaVZ/9aaebnYOcSdqV3oKJrIWkDex6ZwGy5e+DFyKLD+KvRRWHMvASw+6HJYZywPZ+DtgE9tPb0W+VEYu/kCNLphSUOY1SLPdjiqW0rrw4RtY63SSR/TAyZaz8ucjKzDsJvpkHHR61VsLSqXpA/F3+bPz5kI0+gWuzBFtb+5i8tH7KJtyEblWxecYOTufbjIjuzLZs3VpkDH7Qj0NjZA6FXU4RjD5/XOMhL1oCUhNzIFYTjM9VwOVkpfE7KLkLlCVSLPdiiUhJZaYDQWMtVJ1xOUkLngA6VJ1At9mCLSsmOokmISM6wNnDpZjq0vO9D5QlUiz3YolJzKPEBXLieChG8PGni7NVbUFbT+P80sO9+P7zTDApPo8S7edZfI0VVDO19tk8iqsUebEGpCcjjoHXA8oKn0Y1CUWUVnIpJEpq4knrPvQbc/2eOjdTGcRvRpm4NxGWo4Ulds81xqsUe/zxTsBxNHCyZsBFdC6olb46H1RmCTryG9UhTdaHC9tCS8kYR3hCFSYuwyhNoSXkTGFLhfeRM7Zy78gRaUv5cjGmqcFeeQMvJn7PRb30OKmrckifQchuT8zFNw+7Iu/TPnJRJVLafc0e+Tzd6mJbyxBNPPPmn4uX1F2I7DwbOG5FNAAAAAElFTkSuQmCC">';
//     let amz_icon = '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA%2FPjxzdmcgaGVpZ2h0PSIzMiIgd2lkdGg9IjMxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yNy4xOTEgMjYuMzUyYy0xMy4xODUgNi4yNzUtMjEuMzY4IDEuMDI1LTI2LjYwNi0yLjE2NC0uMzI0LS4yMDEtLjg3NS4wNDctLjM5Ny41OTYgMS43NDUgMi4xMTYgNy40NjQgNy4yMTYgMTQuOTI5IDcuMjE2IDcuNDcgMCAxMS45MTQtNC4wNzYgMTIuNDctNC43ODcuNTUyLS43MDUuMTYyLTEuMDk0LS4zOTYtLjg2MXptMy43MDMtMi4wNDVjLS4zNTQtLjQ2MS0yLjE1My0uNTQ3LTMuMjg1LS40MDgtMS4xMzQuMTM1LTIuODM2LjgyOC0yLjY4OCAxLjI0NC4wNzYuMTU2LjIzMS4wODYgMS4wMS4wMTYuNzgxLS4wNzggMi45NjktLjM1NCAzLjQyNS4yNDIuNDU4LjYtLjY5OCAzLjQ1OS0uOTA5IDMuOTItLjIwNC40NjEuMDc4LjU4LjQ2MS4yNzMuMzc4LS4zMDcgMS4wNjItMS4xMDIgMS41MjEtMi4yMjcuNDU2LTEuMTMxLjczNC0yLjcwOS40NjUtMy4wNnoiIGZpbGw9IiNGNEI0NTkiLz48cGF0aCBkPSJNMjMuODU0IDE2LjM5MXYtMTAuNTA4YzAtMS44MDUtMS43NDYtNS44ODMtOC4wMjEtNS44ODMtNi4yNzQgMC05LjYxMiAzLjkyMS05LjYxMiA3LjQ1M2w1LjI0NC40NjlzMS4xNjgtMy41MyAzLjg3OS0zLjUzIDIuNTI1IDIuMTk2IDIuNTI1IDIuNjcxdjIuMjgzYy0zLjQ3My4xMTctMTIuMDk3IDEuMTA5LTEyLjA5NyA4LjM4MSAwIDcuODIgOS44NzEgOC4xNDggMTMuMTA4IDMuMDk0LjEyNS4yMDUuMjY3LjQwNi40NDUuNTk0IDEuMTkxIDEuMjUyIDIuNzggMi43NDQgMi43OCAyLjc0NGw0LjA0OC00Yy4wMDItLjAwMS0yLjI5OS0xLjgwNy0yLjI5OS0zLjc2OHptLTExLjk5NS4zNjljMC0zLjM1OSAzLjU5OS00LjA0IDYuMDExLTQuMTJ2Mi44OTFjLS4wMDEgNS43MjctNi4wMTEgNC44Ni02LjAxMSAxLjIyOXoiIGZpbGw9IiM0ODQ4NDgiLz48L3N2Zz4%3D">';
//     let link = 'https://www.amazon.com/s/?url=search-alias%3Daps&field-keywords=' + text.replace(/\s/g, '+');
//     let link_translate = 'https://translate.google.com/?hl=ru#en/ru/' + text;
//     let translate_module = '<a class="trlt-link" target="_blank" href="' + link_translate + '">' + trslt_icon + '</a>';
//     $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" keyword="' + text+ '" key="' + cls + ' ' + 'trnsf" role="alert"><a class="amz-link" target="_blank" rel="noopener noreferrer" href='+ link + '>' +amz_icon + '</a>' + translate_module + text + closeButton + '</li>');
//     // $('#phrases').append('<li class="alert alert-info alert-dismissible fade show" hidden="false" keyword="' + text + '" key="' + cls + '" role="alert">' + text+ closeButton + '</li>');
//     $(element).closest('li').remove();
//     temp_arr.splice(parseInt(cls), 1, "");
//
//     let col_output = $('#output li').length;
//     $('#output-block h3 span').text(col_output);
//     let col_phrases = $('#phrases li').length;
//     $('#phrases-block h3 span').text(col_phrases);
// }
//
//
// function select_word(element){
//     count_w = 0;
//     let sel = $(element).attr('sel');
//     let phrase_arr = $('#phrases li');
//     if(sel === 'false'){
//         $(element).attr('sel', 'true');
//         $(element).css('font-weight', 'bold');
//     }
//     else{
//         $(element).attr('sel', 'false');
//         $(element).css('font-weight', 'normal');
//     }
//     let words_arr = $('#history li span');
//     let words = [];
//     $.each(phrase_arr, (idx, el) => {
//         $(el).css('display', 'none');
//     })
//
//     $.each(words_arr, (idx, el) =>{
//         if($(el).attr('sel') == 'true'){
//             words.push($(el).text());
//             text = $(el).text();
//
//             $.each(phrase_arr, (idx, elem) => {
//                 let txt = $(elem).text().substring(0, $(elem).text().length - 1);
//                 let re = new RegExp('(\\s|^)+' + text + '+(\\s|$)', 'gm');
//                 if(txt.search(re) != -1){
//                     $(elem).css('display', 'block');
//                     count_w++;
//                 }
//             })
//         }
//     })
//
//     if(words.length == 0){
//         $.each(phrase_arr, (idx, el) =>{
//             $(el).css('display', 'block');
//         })
//         count_w = phrase_arr.length;
//     }
//
//     $('#phrases-block h3 span').text(count_w);
// }
//
