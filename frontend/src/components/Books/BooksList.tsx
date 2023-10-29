import BookItem from "./BookItem";

import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";
import BookScrollCard from "./BookScrollCard";
import Direction from "../../enums/Direction";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const BooksList = () => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <div className="example" style={{ paddingTop: "100px" }}>
      <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={onWheel}
          wrapperClassName="test"
          itemClassName="test2"
        >
          <BookScrollCard>
            <BookItem priority={10} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={9} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={8} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={7} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={6} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={5} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={4} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={3} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={2} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={1} animationDirection={Direction.Left} />
          </BookScrollCard>
        </ScrollMenu>
      </div>
    </div>
  );
};

export default BooksList;
