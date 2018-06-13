
## Table of Contents

- [Best Practises](#best-practises)
  - [npm start](#dom)
  - [npm test](#components)
  - [npm run build](#reducers)
  - [npm run eject](#css)
- [Wording](#wording)


## Best Practises


### DOM 

- Events : Avoid useless events listening by creating/removing them right in time. 
Ex : "start listening "dragover" when "dragstart" fired on elmt"

### Components

- Form : Make various type like NumberType, SingleSelectType... to make code easiest to understand
- Use PropTypes & PropDefaults for everyclass
- Centralize recurrent PropTypes into components/propTypes

### Reducers

- Action type name: Should look like : {action_origin}_{action_name}. Ex : STICKER_LIST_MOUSE-DOWN // SIMULATOR_DRAG-END
With action_origin as the element where the event has been fired

### CSS 

- NEVER use CSS classes for retrieving elements inside actions and reducers logic
- Use "data-xxxx" instead
- If need to use element with specific ID, define this ID inside constants params


## Wording


- Library : Left sidebar where items can enrich the story
- MediaPanel : The central window where clip medias can be designed by adding and styling stickers
- Sticker : A component (text, svg, image...) that can be used in Library or MediaPanel 
- MediaPanelSticker : A sticker container inside the MediaPanel


