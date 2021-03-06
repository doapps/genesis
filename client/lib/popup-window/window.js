const windowProps = ( width, height, top, left ) => [
  'toolbar=no',
  'location=no',
  'directories=no',
  'status=no',
  'menubar=no',
  'scrollbars=no',
  'resizable=no',
  'copyhistory=no',
  `width=${ +width }`,
  `height=${ +height }`,
  `top=${ +top }`,
  `left=${ +left }`,
].join( ', ' );

function createPopUp( url, title, width, height ) {
  const left = ( window.screen.width / 2 ) - ( width / 2 );
  const top = ( window.screen.height / 2 ) - ( height / 2 );
  const newWindow = window.open( url, title, windowProps( width, height, top, left ) );

  return newWindow;
}

function openWindow( url, title = '' ) {
  return createPopUp( url, title, '430', '430' );
}

export default openWindow;

/*
var child = window.open('http://google.com','','toolbar=0,status=0,width=626,height=436');
var timer = setInterval(checkChild, 500);

function checkChild() {
    if (child.closed) {
        alert("Child window closed");
        clearInterval(timer);
    }
}
 */
