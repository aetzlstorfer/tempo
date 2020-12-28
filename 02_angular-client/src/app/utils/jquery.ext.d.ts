// extend jquery to support bootstrap's modal function
type ModalOptions = 'show' | 'hide';
interface JQuery {
  modal(ModalOptions): JQuery;
}
