'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReaderMenu from '@/components/reader/reader-menu';

export default function Page({ params }: { params: { slug: string } }) {

  return (
    <div className='w-screen h-screen'>
      <ReaderMenu />

      <div id="reader" className="w-screen h-[98vh] bg-background text-foreground text-start">
        <ScrollArea className="h-full w-full rounded-md p-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor tellus
          libero, a ultricies velit semper vitae. Nullam in odio lobortis, pretium ligula nec,
          eleifend urna. Nullam tincidunt porta nisl. Curabitur luctus, diam sed congue ornare, diam
          elit maximus purus, vulputate pulvinar purus ante vel tellus. Sed sed leo a turpis
          convallis maximus. Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Etiam sed libero nibh. Nunc sed ligula vestibulum, rhoncus lorem
          non, aliquam risus. Nam elementum, neque finibus tempor sodales, mi ipsum cursus augue, id
          consequat ipsum nisl sed lectus. Ut sodales nibh eget gravida ultricies. Etiam sagittis
          ipsum ac mauris hendrerit mattis vel eget magna. Nulla at turpis ac erat ultrices
          tristique. Nam laoreet est vitae tellus volutpat, vitae rutrum nibh suscipit. Pellentesque
          sit amet ultrices nibh, ac pulvinar augue. Phasellus eu nisl ut dui semper sagittis.
          Quisque vehicula finibus lacus, vel pharetra dolor rutrum ac. Sed faucibus odio non leo
          laoreet varius. Sed non finibus nisl. Sed leo ipsum, vehicula in ornare nec, bibendum in
          arcu. Aenean tincidunt ornare libero, et ultrices nibh finibus at. Suspendisse gravida in
          erat at tempus. Aliquam vestibulum justo non suscipit lobortis. In et diam at dolor
          gravida molestie. Sed tempor diam ut bibendum tincidunt. Nulla dictum massa non magna
          bibendum porta. Nulla facilisi. Aliquam nisi urna, bibendum pellentesque neque eget,
          gravida tristique neque. Nam id malesuada nisi. Pellentesque quis magna euismod, iaculis
          lacus vitae, ullamcorper urna. Nulla porttitor dictum massa sed faucibus. Donec dignissim,
          nisi eu ornare tempor, odio orci suscipit mi, sit amet congue dolor tortor ut sem. Nullam
          eget urna urna. Quisque dictum ultrices auctor. Donec pharetra sodales libero sit amet
          interdum. Proin tortor eros, viverra ut nisl sit amet, interdum interdum augue. Morbi
          elementum maximus eleifend. Aliquam vel turpis tortor. Phasellus suscipit vel purus vitae
          convallis. Cras vel urna elementum, commodo ante quis, consequat tortor. Aliquam at
          condimentum nunc. Mauris at cursus leo. Proin ultrices, massa at mattis tincidunt, ex
          lectus ullamcorper dui, id pretium tortor erat at arcu. Phasellus varius leo ut leo
          aliquet, in sollicitudin ex fermentum. Duis massa est, varius ac sapien nec, tincidunt
          dapibus est. Duis scelerisque tincidunt velit auctor convallis. Integer nec pellentesque
          lacus. Pellentesque a maximus ex, sed mattis lorem. Curabitur at blandit sapien, ac
          accumsan ex.
        </ScrollArea>
      </div>
    </div>
  )
}
